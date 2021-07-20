import { TestBed } from '@angular/core/testing';

import { SkillsGraphDataService } from './skills-graph-data.service';

describe('SkillsGraphDataService', () => {
    let service: SkillsGraphDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SkillsGraphDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
