import { Animation } from './animation.interface';

export interface AnimationCollection {
    readonly Alert: Animation;
    readonly CheckingSomething: Animation;
    readonly Congratulate: Animation;
    readonly EmptyTrash: Animation;
    readonly Explain: Animation;
    readonly GestureDown: Animation;
    readonly GestureLeft: Animation;
    readonly GestureRight: Animation;
    readonly GestureUp: Animation;
    readonly GetArtsy: Animation;
    readonly GetAttention: Animation;
    readonly GetTechy: Animation;
    readonly GetWizardy: Animation;
    readonly GoodBye: Animation;
    readonly Greeting: Animation;
    readonly Hearing_1: Animation;
    readonly Hide: Animation;
    readonly Idle1_1: Animation;
    readonly IdleAtom: Animation;
    readonly IdleEyeBrowRaise: Animation;
    readonly IdleFingerTap: Animation;
    readonly IdleHeadScratch: Animation;
    readonly IdleRopePile: Animation;
    readonly IdleSideToSide: Animation;
    readonly IdleSnooze: Animation;
    readonly LookDown: Animation;
    readonly LookDownLeft: Animation;
    readonly LookDownRight: Animation;
    readonly LookLeft: Animation;
    readonly LookRight: Animation;
    readonly LookUp: Animation;
    readonly LookUpLeft: Animation;
    readonly LookUpRight: Animation;
    readonly Print: Animation;
    readonly Processing: Animation;
    readonly RestPose: Animation;
    readonly Save: Animation;
    readonly Searching: Animation;
    readonly SendMail: Animation;
    readonly Show: Animation;
    readonly Thinking: Animation;
    readonly Wave: Animation;
    readonly Writing: Animation;
    // TODO ?
    [key: string]: Animation;
}
