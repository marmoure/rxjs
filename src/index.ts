import { from, fromEvent, interval, Observable } from 'rxjs';
import { merge } from 'rxjs-compat/operator/merge';
import { take , repeat, startWith, map, filter, tap, switchAll, takeUntil, buffer, throttle, bufferTime, finalize, mergeAll, concatAll } from 'rxjs/operators';



const div = document.getElementById("div");
const popup = document.getElementById("popup");
let x;
let y;

fromEvent(div,"mouseenter")
.pipe(
    tap(e => popup.style.display= "block"),
    map((e) => fromEvent(div,"mousemove")),
    concatAll<MouseEvent>(),
    map((e : MouseEvent) => {
        if(e.target === popup) {
            x += e.offsetX;
            y +=e.offsetY;
        } else {
            x = e.offsetX;
            y = e.offsetY;
        }
        return ({
            x,
            y,
        });
    }),
    tap(dim => {
        popup.style.top = `${dim.y}px`
        popup.style.left = `${dim.x}px`
    }),
    takeUntil(fromEvent(div,"mouseleave")),
    finalize(() => popup.style.display= "none"),
    repeat()
)
.subscribe()