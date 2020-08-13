import { AnimationFrame } from './animation-frame.interface';

export interface Animation {
    readonly frames: AnimationFrame[];
    readonly useExitBranching?: boolean;
}
