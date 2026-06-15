import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MatPaginatorIntl } from '@angular/material/paginator';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ]
};

function customPaginatorLabels(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Attēli vienā lapā';
    paginatorIntl.nextPageLabel = 'Nākošā lapa';
    paginatorIntl.previousPageLabel = 'Iepriekšējā lapa';
    paginatorIntl.firstPageLabel = 'Pirmā lapa';
    paginatorIntl.lastPageLabel = 'Pēdējā lapa';

    paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ): string => {  
      if (length === 0 || pageSize === 0) {
        return `0 of ${length}`;
      }

      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);

      return `${startIndex + 1} – ${endIndex} of ${length}`;
    };

    return paginatorIntl;
  }
