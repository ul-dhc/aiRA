import { Injectable, effect, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { LocaleService } from './locale.service';

@Injectable()
export class LocalizedPaginatorIntl extends MatPaginatorIntl {
  private readonly locale = inject(LocaleService);

  constructor() {
    super();
    effect(() => {
      const lv = this.locale.locale() === 'lv';
      this.itemsPerPageLabel = lv ? 'Attēlu skaits vienā lapā' : 'Images per page';
      this.nextPageLabel = lv ? 'Nākamā lapa' : 'Next page';
      this.previousPageLabel = lv ? 'Iepriekšējā lapa' : 'Previous page';
      this.firstPageLabel = lv ? 'Pirmā lapa' : 'First page';
      this.lastPageLabel = lv ? 'Pēdējā lapa' : 'Last page';
      this.changes.next();
    });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) return `0 ${this.locale.locale() === 'lv' ? 'no' : 'of'} ${length}`;
    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);
    return `${start + 1} – ${end} ${this.locale.locale() === 'lv' ? 'no' : 'of'} ${length}`;
  };
}
