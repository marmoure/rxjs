import { combineLatest, fromEvent, merge } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

const heightRange = document.getElementById("height") as HTMLInputElement;
const heightValue = document.getElementById("height-value");
const widthRange = document.getElementById("width") as HTMLInputElement;
const widthValue = document.getElementById("width-value");
const areaInput = document.getElementById("area") as HTMLInputElement;
const areaDiv = document.getElementById("areaDIV") as HTMLDivElement;


const height$ = fromEvent(heightRange,"input").pipe(
  map(e => e.target.value),
  startWith(heightRange.value),
  tap(v => { heightValue.innerText = v}),
)
const width$ = fromEvent(widthRange,"input").pipe(
  map(e => e.target.value),
  startWith(widthRange.value),
  tap(v => { widthValue.innerText = v}),
)

const area$ = combineLatest(
  [height$,width$]
).pipe(
  tap(([w,h]) => {
    areaDiv.style.width = `${w}px`;
    areaDiv.style.height = `${h}px`
  }),
  map(([w,h]) => w*h),
  tap(v => areaInput.value = v),
);

area$.subscribe();
