/** @type {import('tailwindcss').Config} */

import { cusColor } from './config/tailwindcss/color.ts'
import { screenSizes, commonSizes } from './config/tailwindcss/sizes.ts'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: screenSizes,

            backgroundColor: cusColor,
            textColor: cusColor,
            borderColor: cusColor,
            fill: cusColor,

            fontSize: commonSizes,
            width: commonSizes,
            minWidth: commonSizes,
            height: commonSizes,
            minHeight: commonSizes,
            maxHeight: commonSizes,
            padding: commonSizes,
            margin: commonSizes,
            inset: commonSizes,
            gap: commonSizes,
            borderRadius: commonSizes,
            lineHeight: commonSizes,
        },
    },
    plugins: [],
}