import { $, $$ } from "voby"


interface AppBarProps {
    children: JSX.Child,
    sticky?: boolean
}

export const AppBar = ({
    children,
    sticky = false
}: AppBarProps) => {
    const visible = $(true)

    var lastScrollTop = 0;

    function handleScroll(e: WheelEvent) {
        var currentY = window.scrollY || document.documentElement.scrollTop;
        if (currentY > lastScrollTop) {
            // downscroll code
            visible(false)
        } else if (currentY < lastScrollTop) {
            // upscroll code
            visible(true)
        } // else was horizontal scroll
        lastScrollTop = currentY <= 0 ? 0 : currentY; // For Mobile or negative scrolling
    }

    function throttle(callbackFn: Function, delay: number) {
        let wait = false;
        return function () {
            if (!wait) {
                callbackFn();
                wait = true;
                setTimeout(function () {
                    wait = false;
                }, delay);
            }
        }
    }
    if (sticky) {
        document.addEventListener("scroll", throttle(handleScroll, 100))
    }

    return (
        <div className={
            [
                "transition-shadow duration-300 ease-in-out delay-[0ms] shadow-[rgba(0,0,0,0.2)_0px_2px_4px_-1px,rgba(0,0,0,0.14)_0px_4px_5px_0px,rgba(0,0,0,0.12)_0px_1px_10px_0px] flex flex-col w-full bg-blue-500 box-border shrink-0 text-black",
                `${sticky ? "sticky z-10 top-0 left-auto right-0 self-start" : "static left-0 right-0 top-0"}`,
            ]}
            style={{
                visibility: () => $$(visible) ? "visible" : "hidden",
                transform: () => $$(visible) ? "none" : "translateY(-48px)",
                transition: () => $$(visible) ? "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms" : "transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms "
            }}
        >
            <div className={"relative inline-flex items-center min-h-[56px] px-4;"}>
                {children}
            </div>
        </div>
    )
}