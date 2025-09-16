/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import { format as fd, format } from 'date-fns';
import { FormatNumberOptions } from 'src/global.config';
import { isNumeric } from '.';
import { Time } from 'highcharts';
import { TRange } from 'src/views/farming/Graph/GraphSection';

/**
 *
 * @param address The input address
 * @param first The number of characters will be taken from begin of the address. This value cannot be negative
 * @param last The number of characters will be taken from last of the address. This value cannot be negative
 * @returns
 */
export function formatAddress(address: string, first = 6, last = 4): string {
    if (first < 0 || last <= 0) {
        throw new Error('Invalid parameter(s)');
    }
    return address.slice(0, first) + '...' + address.slice(-last);
}

/**
 * Format a number
 * @param {*} number - The number needs to format
 * @param {FormatNumberOptions} options - Includes options to customize the results returned
 * @returns A string representing a number in formatted, `option.fallback` will be returned if `number` is invalid
 */
export function formatNumber(number: any, options?: FormatNumberOptions): string | FormatNumberOptions['fallback'] {
    const { fallback = '0.00', fractionDigits = 2, delimiter, padZero, prefix, suffix, onlyPositive } = options ?? {};

    if (!isNumeric(number)) {
        return fallback;
    }

    let num: number | string = parseFloat(number);
    if (onlyPositive && num < 0) {
        num = 0;
    }
    if (isNumeric(fractionDigits)) {
        num = num.toFixed(fractionDigits);
    }
    if (!padZero) {
        num = Number(num); // remove last zeros
    }
    return (prefix ?? '') + numberWithCommas(num, delimiter) + (suffix ?? '');
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 */
export function compactNumber(n: number | string, fractionDigits = 1) {
    if (!isNumeric(n)) {
        throw new Error('Must provide a correct number');
    }
    const absValue = Math.abs(Number(n));
    const isNegative = Number(n) < 0;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor((('' + parseInt('' + absValue)).length - 1) / 3);

    let shortValue = (Number(absValue) / Math.pow(1000, suffixNum)).toPrecision(fractionDigits + 1);

    if (Number(shortValue) % 1 !== 0) {
        shortValue = Number(shortValue).toFixed(fractionDigits);
    }

    return (isNegative ? '-' : '') + Number(shortValue).toLocaleString() + suffixes[suffixNum];
}

export function numberWithCommas(x: number | string, delimiter = ','): string {
    if (!isNumeric(x)) {
        throw new Error('Must provide a correct number');
    }
    const [naturalPart, decimalPart] = x.toString().split('.');
    let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    if (decimalPart) {
        out += '.' + decimalPart;
    }
    return out;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
export function decimalAdjust(type: 'ceil' | 'round' | 'floor', value: any, exp?: any): any {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // If the value is negative...
    if (value < 0) {
        return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

export const formatDate = {
    MMM_dd_h_mm_a: (date: Date) => {
        return fd(date, 'MMM dd, h:mm a');
    },
    MMM_dd_YYYY_h_mm_a: (date: Date) => {
        return fd(date, 'MMM dd yyyy, h:mm a');
    },
    MMMM_dd_YYY: (date: Date) => {
        return fd(date, 'MMMM dd, YYY');
    },
    MM_dd_YYYY_h_mm_a: (date: Date) => {
        return fd(date, 'MM/dd/yyyy, h:mm a');
    },
};

export function roundNumber(num: number | string, scale: number) {
    if (!('' + num).includes('e')) {
        return +(Math.round(Number(num + 'e+' + scale)) + 'e-' + scale);
    } else {
        const arr = ('' + num).split('e');
        let sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(Math.round(Number(+arr[0] + 'e' + sig + (+arr[1] + scale))) + 'e-' + scale);
    }
}

export function decimalFlood(num: string | number, precision: number) {
    //lam tron xuong
    const _precision = BigNumber('10').pow(precision);
    const _bigNumber = BigNumber(num).multipliedBy(_precision);
    return _bigNumber.integerValue(BigNumber.ROUND_FLOOR).div(_precision).toFixed();
}

export function highchartDateFormat(timestamp?: number | undefined, format?: string | undefined): string {
    return new Time({ timezone: 'UTC' }).dateFormat(format ? format : '%b %e, %Y, %I:%M %p (UTC)', timestamp);
}

export function timeAgo(transactionTimestamp: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    const secondsDiff = currentTime - transactionTimestamp;

    const formatTime = (value: number, unit: string) => {
        return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
    };

    if (secondsDiff < 60) {
        return 'just now';
    }
    const minutesAgo = Math.floor(secondsDiff / 60);
    if (minutesAgo < 60) {
        return formatTime(minutesAgo, 'minute');
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return formatTime(hoursAgo, 'hour');
    }
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
        return formatTime(daysAgo, 'day');
    }
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
        return formatTime(weeksAgo, 'week');
    }
    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
        if (monthsAgo === 0 && weeksAgo >= 4) {
            return formatTime(weeksAgo, 'week');
        }
        return formatTime(monthsAgo, 'month');
    }
    const yearsAgo = Math.floor(daysAgo / 365);
    return formatTime(yearsAgo, 'year');
}

export function formatUTCTimestamp(timestamp: number, range: TRange): string {
    const date = new Date(timestamp);
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    switch (range.value) {
        case '1':
            return format(utcDate, 'h aaa');
        case '7':
            return format(utcDate, 'MMM dd');
        case '30':
            return format(utcDate, 'MMM dd');
        case '90':
            return format(utcDate, 'MMM dd');
        default:
            return format(utcDate, 'Pp');
    }
}
