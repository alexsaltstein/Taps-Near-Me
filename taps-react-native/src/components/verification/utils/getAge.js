import moment from 'moment';

const getAge = (text) => {

    const MM = text.substring(0, 2);
    const DD = text.substring(2, 4);
    const YYYY = text.substring(4);
    const years = moment(new Date())
    .diff(`${YYYY}-${MM}-${DD}`,
        'years', false);

    return years;
    
}

module.exports = getAge;


