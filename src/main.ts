import { platformNativeScriptDynamic } from "@nativescript/angular";
import { enableProdMode } from '@angular/core';
import { AppModule } from "./app/app.module";

// enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);

