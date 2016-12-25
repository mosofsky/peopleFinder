import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { routing,
         appRoutingProviders } from './app.routes';

import { HttpModule, JsonpModule } from '@angular/http';

import { FormsModule }          from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS
    ],
    imports:      [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        FormsModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
