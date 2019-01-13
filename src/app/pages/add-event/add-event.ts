import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { AlertController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  event = { title: "", location: "", message: "", startDate: "", endDate: "" };

  constructor(public alertController: AlertController,
    public navController: NavController,
    public navParams: NavParams,
    private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  save() {
    this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
        this.presentAlert('Success!', '', 'Event saved successfully');
        // this.navController.pop();
      },
      (err) => {
        this.presentAlert('Success!', '', 'Event saved successfully');
      }
    );
  }

  async presentAlert(title, subtitle, message) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
