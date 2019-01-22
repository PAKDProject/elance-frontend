import { NgModule } from "@angular/core";
import { NgxsModule } from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { UserState } from "src/redux/states/user.state";
import { JobsState } from "src/redux/states/job.state";
import { OrgsState } from "src/redux/states/organisation.state";

@NgModule({
    imports: [
        NgxsModule.forRoot([
            UserState,
            JobsState,
            OrgsState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    exports: [NgxsModule, NgxsReduxDevtoolsPluginModule]
})
export class AppReduxModule { }