import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
} from '@angular/core';
import {
    Subscription,
} from 'rxjs';

import { AnimationCollection } from '../animation-collection.interface';
import { AnimationFrame } from '../animation-frame.interface';
import { AnimationState } from '../animation-state.enum';
import { Animation } from '../animation.interface';
import { CLIPPY_DATA } from './clippy.data';

type animationType = string;

@Component({
    selector: 'app-clippy',
    styleUrls: [
        './clippy.component.scss',
    ],
    templateUrl: './clippy.component.html',
})
export class ClippyComponent implements OnDestroy {

    private readonly soundsEnabled = true;

    private _exiting = false;
    private _currentAnimation?: Animation;
    private _started = false;
    public _currentFrame?: AnimationFrame;
    public currentAnimationName?: animationType;
    public _currentFrameIndex = 0;
    private readonly _data: AnimationCollection = CLIPPY_DATA;

    private readonly _subscriptions: Subscription[] = [];

    private readonly idleAnimations: animationType[] = [
        'Idle1_1',
        'IdleAtom',
        'IdleEyeBrowRaise',
        'IdleFingerTap',
        'IdleHeadScratch',
        'IdleRopePile',
        'IdleSideToSide',
        'IdleSnooze',
    ];
    @Input() private readonly idleAnimationDelayMin: number = 5000;
    @Input() private readonly idleAnimationDelayMax: number = 10000;
    @Input() private readonly playRandomAnimationWhenClicked = true;
    @Input() public readonly dialogContent?: TemplateRef<{}>;
    @Input() public readonly showIdleAnimations = true;

    @Output() public readonly animationFinished = new EventEmitter<[animationType | undefined, AnimationState]>();
    @Output() public readonly clicked = new EventEmitter<undefined>();

    private readonly queueTimer: number;
    private queuedAnimationName?: animationType;
    private get idle(): boolean {
        return !this.currentAnimationName && !this.queuedAnimationName;
    } // end get idle()

    constructor() {
        this._subscriptions.push(
            this.animationFinished.subscribe(
                (): void => {
                    this.playNextQueued();
                    this.scheduleRandomIdle();
                }
            ),
            this.clicked.subscribe(
                (): void => {
                    if (this.playRandomAnimationWhenClicked) {
                        const rnd = this.getRandomElement<animationType>(Object.keys(this._data));
                        if (rnd) {
                            this.queueAnimation(rnd);
                        }
                    }
                }
            ),
        );
        this.queueAnimation('Greeting');
        this.queueTimer = window.setInterval(
            (): void => {
                this.playNextQueued();
            }, 1000
        );
    } // end constructor()

    private getRandomElement<T>(arr: T[]): T {
        return arr[parseInt((Math.random() * arr.length) as unknown as string, 0)];
    } // end getRandomElement()

    private showAnimation(animationName: animationType): void {
        this._exiting = false;

        if (!this._data[animationName]) {
            console.error(`Missing animation: ${animationName}`);
            this.animationFinished.emit([animationName, AnimationState.ERROR]);
            return;
        }

        this._currentAnimation = this._data[animationName];
        this.currentAnimationName = animationName;
        this._currentFrameIndex = 0;

        if (!this._started) {
            this._started = true;
            this._step();
        }
    } // end showAnimation()

    private playNextQueued(): void {
        if (this.queuedAnimationName) {
            const nextAnim: animationType = this.queuedAnimationName;
            this.queuedAnimationName = undefined;
            this.showAnimation(nextAnim);
        }
    } // end playNextQueued()

    public queueAnimation(animationName: animationType): void {
        this._exiting = true;
        this.queuedAnimationName = animationName;
    } // end queueAnimation()

    private scheduleRandomIdle(): void {
        if (this.idle && this.showIdleAnimations) {
            const randomIdleAnimation = this.getRandomElement<animationType>(this.idleAnimations);
            if (randomIdleAnimation) {
                this.scheduleIdleAnimation(
                    this.idleAnimationDelayMin + Math.random() * (this.idleAnimationDelayMax - this.idleAnimationDelayMin),
                    randomIdleAnimation
                );
            }
        }
    } // end scheduleRandomIdle()

    private scheduleIdleAnimation(countdown: number, animationName: animationType): void {
        window.setTimeout((): void => {
            if (this.idle) {
                this.queueAnimation(animationName);
            }
        }, countdown);
    } // end scheduleIdleAnimation()

    private get _atLastFrame(): boolean {
        if (!this._currentAnimation) {
            return true;
        }
        return this._currentFrameIndex >= this._currentAnimation.frames.length - 1;
    } // end get _atLastFrame()

    private _getNextAnimationFrame(): number {
        if (!this._currentAnimation) {
            return 0;
        }
        // No current frame. start animation.
        if (!this._currentFrame) {
            return 0;
        }

        if (this._exiting && this._currentFrame.exitBranch !== undefined) {
            return this._currentFrame.exitBranch;
        }
        if (this._currentFrame.branching) {
            let rnd: number = Math.random() * 100;
            for (const branch of this._currentFrame.branching.branches) {
                if (rnd <= branch.weight) {
                    return branch.frameIndex;
                }

                rnd -= branch.weight;
            }
        }

        return this._currentFrameIndex + 1;
    } // end _getNextAnimationFrame()

    private _step(): void {
        if (!this._currentAnimation) {
            return;
        }
        const newFrameIndex: number = Math.min(this._getNextAnimationFrame(), this._currentAnimation.frames.length - 1);
        const frameChanged = !this._currentFrame || this._currentFrameIndex !== newFrameIndex;
        this._currentFrameIndex = newFrameIndex;

        // always switch frame data, unless we're at the last frame of an animation with a useExitBranching flag.
        if (!(this._atLastFrame && this._currentAnimation.useExitBranching)) {
            this._currentFrame = this._currentAnimation.frames[this._currentFrameIndex];
        }

        window.setTimeout((): void => {
            this._step();
        }, this._currentFrame?.duration);

        // fire events if the frames changed and we reached an end
        if (frameChanged) {

            // this._draw();
            if (this.soundsEnabled) {
                this._currentFrame?.sound?.play();
            }

            if (this._atLastFrame) {
                if (this._currentAnimation.useExitBranching && !this._exiting) {
                    this.animationFinished.emit([this.currentAnimationName, AnimationState.WAITING]);
                } else {
                    const justFinished = this.currentAnimationName;
                    this.currentAnimationName = undefined;
                    this.animationFinished.emit([justFinished, AnimationState.EXITED]);
                }
            }
        }
    } // end _step()

    public onClick(): void {
        this.clicked.emit(undefined);
    } // end onClick()

    public ngOnDestroy(): void {
        this._subscriptions.forEach(
            (s: Subscription) => {
                s.unsubscribe();
            }
        );
        window.clearInterval(this.queueTimer);
    } // end ngOnDestroy()

}
