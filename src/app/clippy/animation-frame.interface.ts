import { AnimationBranch } from './animation-branch.interface';

export interface AnimationFrame {
    readonly branching?: {
        readonly branches: AnimationBranch[];
    };
    readonly duration: number;
    readonly exitBranch?: number;
    readonly frame: number;
    readonly sound?: HTMLAudioElement;
}
