import {Component, Input} from '@angular/core';
import {NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';

interface TreeNode<T> {
    data: T;
    children?: TreeNode<T>[];
    expanded?: boolean;
}

interface FSEntry {
    Partner: string;
    'Node Type': string;
    Token: string;
    kind: string;
}

@Component({
    selector: 'ngx-partner-network',
    templateUrl: './partner-network.component.html',
    styleUrls: ['./partner-network.component.scss']
})

export class PartnerNetworkComponent {

    customColumn = 'Partner';
    defaultColumns = ['Node Type', 'Token'];
    allColumns = [this.customColumn, ...this.defaultColumns];

    dataSource: NbTreeGridDataSource<FSEntry>;

    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    private data: TreeNode<FSEntry>[] = [
        {
            data: {
                Partner: 'Hilton Honors',
                'Node Type': '<div class="text-anchor-color">Anchor</div>',
                Token: 'HLTN',
                kind: 'dir'
            },
            children: [
                {
                    data: {
                        Partner: 'Hertz Rental',
                        'Node Type': '<div class="text-peer-color">Peer</div>',
                        Token: 'HRTZ',
                        kind: 'doc'
                    }
                },
                {
                    data: {
                        Partner: 'Delta Air',
                        'Node Type': '<div class="text-anchor-color">Anchor</div>',
                        Token: 'DLTA',
                        kind: 'dir',
                    },
                    children: [
                        {
                            data: {
                                Partner: 'Alamo',
                                'Node Type': '<div class="text-peer-color">Peer</div>',
                                Token: 'ALMO',
                                kind: 'doc'
                            }
                        },
                        {
                            data: {
                                Partner: 'Lyft',
                                'Node Type': '<div class="text-peer-color">Peer</div>',
                                Token: 'LYFT',
                                kind: 'doc'
                            }
                        },
                    ]
                },
            ],
        },
        {
            data: {
                Partner: 'Air France',
                'Node Type': '<div class="text-peer-color">Peer</div>',
                Token: 'ARFR',
                kind: 'dir'
            },
        },
        {
            data: {
                Partner: 'Starbucks',
                'Node Type': '<div class="text-peer-color">Peer</div>',
                Token: 'STBS',
                kind: 'dir'
            },
        },
        {
            data: {
                Partner: 'KLM',
                'Node Type': '<div class="text-peer-color">Peer</div>',
                Token: 'AKLM',
                kind: 'dir'
            },
        }
    ];

    constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
        this.dataSource = this.dataSourceBuilder.create(this.data);
    }

    updateSort(sortRequest: NbSortRequest): void {
        this.sortColumn = sortRequest.column;
        this.sortDirection = sortRequest.direction;
    }

    getSortDirection(column: string): NbSortDirection {
        if (this.sortColumn === column) {
            return this.sortDirection;
        }
        return NbSortDirection.NONE;
    }

    getShowOn(index: number) {
        const minWithForMultipleColumns = 400;
        const nextColumnStep = 100;
        return minWithForMultipleColumns + (nextColumnStep * index);
    }
}

@Component({
    selector: 'ngx-fs-icon',
    template: `
        <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
        </nb-tree-grid-row-toggle>
        <ng-template #fileIcon>
            <nb-icon icon="file-text-outline"></nb-icon>
        </ng-template>
    `,
})
export class FsIconComponent {
    @Input() kind: string;
    @Input() expanded: boolean;

    isDir(): boolean {
        return this.kind === 'dir';
    }
}
