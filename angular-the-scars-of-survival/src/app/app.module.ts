import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FacebookModule } from 'ngx-facebook';
import { NgxMaskModule } from 'ngx-mask';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

import { AppComponent } from './app.component';
import { NavListComponent } from './[+]--core/navlist/navlist.component';
import { HomeComponent } from './[+]--pages/home/home.component';
import { BooksComponent } from './[+]--pages/books/books.component';
import { AuthorComponent } from './[+]--pages/author/author.component';
import { DrawerDirective } from './[+]--shared/directives/drawer.directive';

import { DataService } from './[+]--shared/services/data.service';
import { BlogComponent } from './[+]--pages/blog/blog.component';
import { MediaComponent } from './[+]--pages/media/media.component';
import { ContactComponent } from './[+]--pages/contact/contact.component';
import { BlogDetailsComponent } from './[+]--pages/blog/blog-details/blog-details.component';

import { BlogCommentComponent } from './[+]--core/modals/blog-comment/blog-comment.component';
import { ContactModalComponent } from './[+]--core/modals/contact-modal/contact-modal.component';
import { MediaImageComponent } from './[+]--core/modals/media-image/media-image.component';

export const routes: Routes = [
    { path: '', 
     component: HomeComponent
    },
    { path: 'books', 
     component: BooksComponent
    },
    { path: 'author', 
     component: AuthorComponent
    },
    { path: 'blog', 
     component: BlogComponent
    },
    { path: 'blog/:name/:id', 
     component: BlogDetailsComponent
    },
    { path: 'media', 
     component: MediaComponent
    },
    { path: 'contact', 
     component: ContactComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    declarations: [
        AppComponent,
        NavListComponent,
        HomeComponent,
        BooksComponent,
        AuthorComponent,
        DrawerDirective,
        BlogComponent,
        MediaComponent,
        ContactComponent,
        BlogDetailsComponent,
        BlogCommentComponent,
        ContactModalComponent,
        MediaImageComponent
    ],
    imports: [
        BrowserModule,   
        BrowserAnimationsModule, 
        RouterModule.forRoot(routes, { 
            onSameUrlNavigation: 'reload',
            initialNavigation: 'enabled'
        }),
        FacebookModule.forRoot(),
        NgxMaskModule.forRoot(),
        NgxTwitterTimelineModule.forRoot()
    ],
    exports: [ RouterModule ],
    providers: [ DataService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
