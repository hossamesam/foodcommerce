import { cache as reactCache } from "react"
import { unstable_cache as nextCache } from "next/cache";

// type Callback = (...args: any[]) => Promise<any>;
// type Tcache<T> = {
//     cb: T,
//     keyParts: string[],
//     options: { revalidate?: number | false, tags?: string[] }
// }
// export function cache<T extends Callback>({ cb, keyParts, options }: Tcache<T>) {
//     return nextCache(reactCache(cb), keyParts, options)
// }



type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
    cb: T,
    keyParts: string[],
    options: { revalidate?: number | false, tags?: string[] }
) {
    return nextCache(reactCache(cb), keyParts, options)
}

