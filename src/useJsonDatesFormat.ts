import moment from 'moment';

const iso8601Format = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
let alreadyInUse = false;

export const useJsonDatesFormat = (format: string = iso8601Format) => {
    if (alreadyInUse) {
        return;
    }

    alreadyInUse = true;

    const date = new Date();

    // eslint-disable-next-line no-extend-native
    Date.prototype.toJSON = function () {
        return moment(this).format(format);
    };

    const legacyParse = JSON.parse;
    JSON.parse = function (json) {
        if (!json) {
            return undefined;
        }

        return legacyParse(json, (_, value) => {
            if (typeof value !== 'string') {
                return value;
            }

            const momentValue = moment(value, format, true);
            return momentValue.isValid() ? momentValue.toDate() : value;
        });
    };
};
