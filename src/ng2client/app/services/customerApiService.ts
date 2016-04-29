import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {CustomerModel} from '../model/customerModel';
import {UrlService} from './urlService';

@Injectable()
export class CustomerApiService {
    constructor(private _http: Http, private _urlService: UrlService) {
    }

    public list(): Observable<Array<CustomerModel>> {
        const headers = this.createHeaders();
        const endpoint = `${this._urlService.apiUrl}customer/list`;

        return this._http.get(endpoint, {
            headers: headers
        })
            .flatMap(response => Observable.from(response.json()))
                // Uncomment for some nice uifaces ;-)
            /*.mergeMap((customer: CustomerModel) => {
                return this._http.get('http://uifaces.com/api/v1/random')
                    .map(uiFaces => {
                        var result = uiFaces.json();
                        customer.userImageUrl = result.image_urls.bigger;

                        return customer;
                    });
            })*/
            .toArray();
    }

    public remove(userId: number): Observable<Response> {
        const headers = this.createHeaders();
        const endpoint = `${this._urlService.apiUrl}customer/${userId}`;

        return this._http.delete(endpoint, {
            headers: headers
        });
    }

    public create(firstName: string, lastName: string): Observable<Response> {
        const headers = this.createHeaders();
        const endpoint = `${this._urlService.apiUrl}/customer`;
        const payload = new CustomerModel();
        payload.firstName = firstName;
        payload.lastName = lastName;

        return this._http.post(endpoint, JSON.stringify(payload), {
            headers: headers
        });
    }

    private createHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}
