import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    date: any;
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames: string[];
    currentMonth: any;
    currentYear: any;
    currentDate: any;
    eventList: any;
    selectedEvent: any;
    isSelected: any;

    constructor(private alertController: AlertController,
        public navigationController: NavController,
        public calendar: Calendar
    ) {
        console.log('HomePage::constructor | ');
    }

    ngOnInit() {
        console.log('HomePage::ngOnInit | ');

        this.date = new Date();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.getDaysOfMonth();
        this.loadEventThisMonth();
    }

    getDaysOfMonth() {
        console.log('HomePage::getDaysOfMonth | ');

        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        } else {
            this.currentDate = 999;
        }

        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }

        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var j = 0; j < thisNumOfDays; j++) {
            this.daysInThisMonth.push(j + 1);
        }

        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
        for (var k = 0; k < (6 - lastDayThisMonth); k++) {
            this.daysInNextMonth.push(k + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
                this.daysInNextMonth.push(l);
            }
        }
    }

    goToLastMonth() {
        console.log('HomePage::goToLastMonth | ');

        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        console.log('HomePage::goToNextMonth | ');

        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    addEvent() {
        console.log('HomePage::addEvent | ');

        this.navigationController.navigateForward('add-event'); // AddEventPage);
    }

    loadEventThisMonth() {
        console.log('HomePage::loadEventThisMonth | ');

        this.eventList = new Array();
        var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

        // this.calendar.listEventsInRange(startDate, endDate).then(
        //     (msg) => {
        //         msg.forEach(item => {
        //             this.eventList.push(item);
        //         });
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
    }

    checkEvent(day) {
        console.log('HomePage::checkEvent | day=', day);

        var hasEvent = false;
        var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
        var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
        this.eventList.forEach(event => {
            if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
                hasEvent = true;
            }
        });
        return hasEvent;
    }

    selectDate(day) {
        console.log('HomePage::selectDate | day=', day);

        this.isSelected = false;
        this.selectedEvent = new Array();
        var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
        var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
        this.eventList.forEach(event => {
            if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
                this.isSelected = true;
                this.selectedEvent.push(event);
            }
        });
    }

    async deleteEvent(evt) {
        console.log('HomePage::deleteEvent | evt=', evt);

        const alert = await this.alertController.create({
            header: 'Confirm Delete',
            message: 'Are you sure want to delete this event?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Cancel clicked');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('OK clicked');

                        // this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
                        //     (msg) => {
                        //         console.log(msg);
                        //         this.loadEventThisMonth();
                        //         this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
                        //     },
                        //     (err) => {
                        //         console.log(err);
                        //     }
                        // )
                    }
                }
            ]
        });

        await alert.present();
    }
}
