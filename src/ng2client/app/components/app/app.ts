import {Component} from 'angular2/core';
import {RouteConfig, Route, RouterOutlet} from 'angular2/router';
import 'rxjs/Rx';

import {APP_SERVICES} from '../../services/services';
import {AdminAreaComponent} from '../adminArea/adminArea';

@Component({
    selector: 'nfn-app',
    templateUrl: 'app/components/app/app.html',
    directives: [RouterOutlet],
    providers: APP_SERVICES
})
@RouteConfig([
    new Route({ path: '/admin/...', name: 'AdminArea', component: AdminAreaComponent, useAsDefault: true })
])
export class AppComponent {
}
