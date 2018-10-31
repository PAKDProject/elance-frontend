import { NgModule } from "@angular/core";
import { NgxsModule } from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { UserState } from "src/redux/states/user.state";
import { JobsState } from "src/redux/states/job.state";

@NgModule({
    imports: [
        NgxsModule.forRoot([
            UserState,
            JobsState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    exports: [NgxsModule, NgxsReduxDevtoolsPluginModule]
})
export class AppReduxModule { }