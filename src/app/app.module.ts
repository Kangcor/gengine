import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { WorldComponent } from './game/world/world.component';
import { ScoreComponent } from './game/score/score.component';
import {ScoreService} from './game/score/score.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayerComponent,
    WorldComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
