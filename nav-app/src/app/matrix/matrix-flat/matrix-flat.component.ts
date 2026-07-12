import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatrixCommon } from '../matrix-common';
import { ConfigService } from '../../services/config.service';
import { ViewModelsService } from '../../services/viewmodels.service';
import { NgFor, NgStyle, NgIf, NgClass } from '@angular/common';
import { TacticCellComponent } from '../tactic-cell/tactic-cell.component';
import { TechniqueCellComponent } from '../technique-cell/technique-cell.component';
import { TrPipe } from '../../utils/tr.pipe';

@Component({
    selector: 'matrix-flat',
    templateUrl: './matrix-flat.component.html',
    styleUrls: ['./matrix-flat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgFor, NgStyle, TacticCellComponent, NgIf, TechniqueCellComponent, NgClass, TrPipe],
})
export class MatrixFlatComponent extends MatrixCommon implements OnInit {
    constructor(configService: ConfigService, viewModelsService: ViewModelsService) {
        super(configService, viewModelsService);
    }

    ngOnInit(): void {
        // intentionally left blank
    }
}
