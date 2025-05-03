import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { ScrumboardComponent } from './scrumboard';
import { ContactsComponent } from './contacts';
import { NotesComponent } from './notes';
import { TodolistComponent } from './todolist';
import { InvoicePreviewComponent } from './invoice/preview';
import { InvoiceAddComponent } from './invoice/add';
import { InvoiceEditComponent } from './invoice/edit';
import { CalendarComponent } from './calendar';
import { ChatComponent } from './chat';
import { MailboxComponent } from './mailbox';
import { InvoiceListComponent } from './invoice/list';
import { FarComponent } from './far/far.component';
import { AudComponent } from './aud/aud.component';
import { RegComponent } from './reg/reg.component';
import { BarComponent } from './bar/bar.component';
import { IscComponent } from './isc/isc.component';
import { TcpComponent } from './tcp/tcp.component';
import { Far1Component } from './far/far1/far1.component';
import { McqComponent } from './mcq/mcq.component';
import { TbsComponent } from './tbs/tbs.component';
import { PackagesComponent } from './packages/packages.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';

const routes: Routes = [
    { path: 'apps/chat', component: ChatComponent, data: { title: 'Chat' } },
    { path: 'apps/mailbox', component: MailboxComponent, data: { title: 'Mailbox' } },
    { path: 'apps/scrumboard', component: ScrumboardComponent, data: { title: 'Scrumboard' } },
    { path: 'apps/contacts', component: ContactsComponent, data: { title: 'Contacts' } },
    { path: 'apps/notes', component: NotesComponent, data: { title: 'Notes' } },
    { path: 'apps/todolist', component: TodolistComponent, data: { title: 'Todolist' } },
    { path: 'apps/invoice/list', component: InvoiceListComponent, data: { title: 'Invoice List' } },
    { path: 'apps/invoice/preview', component: InvoicePreviewComponent, data: { title: 'Invoice Preview' } },
    { path: 'apps/invoice/add', component: InvoiceAddComponent, data: { title: 'Invoice Add' } },
    { path: 'apps/invoice/edit', component: InvoiceEditComponent, data: { title: 'Invoice Edit' } },
    { path: 'apps/calendar', component: CalendarComponent, data: { title: 'Calendar' } },
    { path: 'apps/packages', component: PackagesComponent, data: { title: 'Packages' }},
    { path: 'apps/far', component: FarComponent, data: { title: 'FAR' }},
    { path: 'apps/subCategory', component: SubcategoriesComponent, data: { title: 'SubCategory' } },
    { path: 'apps/aud', component: AudComponent, data: { title: 'AUD' } },
    { path: 'apps/reg', component: RegComponent, data: { title: 'REG' } },
    { path: 'apps/bar', component: BarComponent, data: { title: 'BAR' } },
    { path: 'apps/isc', component: IscComponent, data: { title: 'ISC' } },
    { path: 'apps/tcp', component: TcpComponent, data: { title: 'TCP' } },
    { path: 'mcq', component: McqComponent, data: { title: 'MSQs' } },
    { path: 'tbs', component: TbsComponent, data: { title: 'TBSs' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        ChatComponent,
        ScrumboardComponent,
        ContactsComponent,
        NotesComponent,
        TodolistComponent,
        InvoiceListComponent,
        InvoicePreviewComponent,
        InvoiceAddComponent,
        InvoiceEditComponent,
        CalendarComponent,
        MailboxComponent,
    ],
})
export class AppsModule {}
