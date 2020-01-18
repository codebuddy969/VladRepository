import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class BlogProvider {

    private readonly blogListURL: string = '/assets/test.blog-list.json';
    private readonly blogEntityURL: string = 'fakepath';

    constructor(private http: HttpClientModule) {
    }

    // getList(): Observable<any[]> {
    //     return this.http
    //         .get(this.blogListURL)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }
    //
    // getBlog(id: number): Observable<any> {
    //     return this.http
    //         .get(`${this.blogEntityURL}/${id}`)
    //         .map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }

}
