import {
    Injectable,
} from '@angular/core';
import {
    timer,
} from 'rxjs';

import * as c3 from 'c3';

import { Skill } from './skill.interface';

@Injectable()
export class SkillsGraphDataService {

    private readonly weightPatterns: [RegExp, number][] = [
       [
           // if > 7 years, it's pretty OP
           // (Caveat: must come before plain expert)
           new RegExp(`^\\s*\\(expert,?\\s*(?:[7-9]|[0-9][0-9])`, 'i'),
           5,
       ],
       [
           new RegExp(`^\\s*\\(expert`, 'i'),
           4,
       ],
       [
           // if > 5 years, it's pretty advanced
           // (Caveat: must come before plain advanced)
           new RegExp(`^\\s*\\(advanced,?\\s*(?:[5-9]|[0-9][0-9])`, 'i'),
           3.5,
       ],
       [
           new RegExp(`^\\s*\\(advanced`, 'i'),
           3,
       ],
       [
           new RegExp(`^\\s*\\(intermediate`, 'i'),
           2,
       ],
       [
           new RegExp(`^\\s*\\(beginner`, 'i'),
           1,
       ],
    ];

    private readonly colors: string[] = [
        '#E8DDCB',
        '#547980',
        '#45ADA8',
        '#9DE0AD',
        '#E5FCC2',
        '#FBC7BA',
    ];

    constructor() {
    } // end constructor()

    private _renderGraphReal(chartSelector: string, skills: Skill[], limit: number = 5): void {
        if (!document.querySelector(chartSelector)) {
            throw 'renderGraph called too early!';
        }
        const data = this.skillsToC3Data(skills, limit);
        console.log(data);
        c3.generate({
            bindto: chartSelector,
			data,
            /*
            pie: {
                label: {
                    show: true,
                    threshold: 0.1,
                },
            },
            */
        });
    } // end _renderGraphReal()

    /**
     * This is a workaround for a race condition when using ngx-md to load
     * markdown from a URL; There's no way to trigger something after the
     * markdown is rendered.
     * See https://github.com/dimpu/ngx-md/issues/210
     */
    public renderGraph(chartSelector: string, skills: Skill[], limit: number = 5): void {
        const elementNotRendered = (): boolean => {
            return !document.querySelector(chartSelector);
        };
        if (elementNotRendered()) {
            console.error('renderGraph called too early! Waiting to render graph...');
            const sub = timer(100, 1000)
                .subscribe((ms: number): void => {
                    if (elementNotRendered()) {
                        console.error(`renderGraph still waiting to render graph after ${ms}ms...`);
                    } else {
                        console.log('rendering graph');
                        this._renderGraphReal(chartSelector, skills);
                        sub.unsubscribe();
                    }
                });
        } else {
            this._renderGraphReal(chartSelector, skills);
        }
    } // end renderGraph()

    private skillsToC3Data(skills: Skill[], limit?: number): c3.Data {
        const columns: [ string, number ][] = [];
        const colors: { [key: string]: string } = {};
        let colorIdx = 0;
        skills.forEach(
            (skill: Skill): void => {
                if (typeof skill.weight === 'undefined') {
                    skill.weight = this.getSkillWeight(skill);
                }
            },
        );
        skills.sort(
            (a: Skill, b: Skill): number => {
                const aval: number = a.weight || 0;
                const bval: number = b.weight || 0;
                if (aval < bval) {
                    return 1;
                } else if (aval > bval) {
                    return -1;
                }
                return 0;
            },
        );
        skills.every(
            (skill: Skill): boolean => {
                if (skill.weight) {
                    columns.push([ skill.name, this.scaleWeight(skill.weight) ]);
                    colors[skill.name] = this.colors[colorIdx];
                    colorIdx = (colorIdx + 1) % this.colors.length;
                }
                if (typeof limit !== 'undefined' && columns.length > limit) {
                    return false;
                }
                return true;
            },
        );

        return {
            type: 'pie',
            colors,
            columns,
        };
    } // end skillsToC3Data()

    private getSkillWeight(skill: Skill): number | undefined {
        let found: number | undefined;
        this.weightPatterns.every(
            ([ re, weight ]): boolean => {
                if (
                    skill.desc &&
                    skill.desc.match(re)
                ) {
                    found = weight;
                    return false;
                }
                return true;
            },
        );
        return found;
    } // end skillsToGraphData()

    private scaleWeight(weight: number): number {
        return weight;
    } // end scaleWeight()

}
