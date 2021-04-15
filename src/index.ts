import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { Observable } from 'rxjs/Observable';
import { take , repeat } from 'rxjs/operators';
import {logBlue, logRed} from './logs';

const o = new Observable((observer) => {
    setInterval(() => {
        logRed("Obserable loop");
        observer.next("this is an obseravable");
    },1000);
});

const p = new Promise((resolve,reject) => {
    logBlue("creating promise");
    resolve("this is a promise");
});

p.then(logBlue);

const subscribtion = o.subscribe(logRed);
setTimeout(() => {
    subscribtion.unsubscribe();
},2050);