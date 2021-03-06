import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { AlertController, NavController, NavParams } from '@ionic/angular';

@Component({
    selector: 'page-edit-event',
    templateUrl: 'edit-event.html',
})
export class EditEventPage {

    event = { title: "", location: "", message: "", startDate: "", endDate: "" };
    oldEvent = { title: "", location: "", message: "", startDate: "", endDate: "" };

    constructor(
        public alertController: AlertController,
        public navController: NavController,
        public navParams: NavParams,
        private calendar: Calendar)
         {
        console.log('EditEventPage::constructor | ');

        this.event = navParams.get("event");
        var startDate = new Date(navParams.get("event").startDate.replace(/\s/, 'T')).toISOString();
        var endDate = new Date(navParams.get("event").endDate.replace(/\s/, 'T')).toISOString();
        this.event.startDate = startDate;
        this.event.endDate = endDate;
        this.oldEvent = this.event;
    }

    ionViewDidLoad() {
        console.log(this.event);
    }

}
