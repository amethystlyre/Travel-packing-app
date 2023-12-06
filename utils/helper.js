module.exports = {
    format_date: (date) => {
        // Format date as DD MMM YYYY
        if (date instanceof Date) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            return date.toLocaleDateString('en-AU', options);
        } else {
            return '____';
        }
    },
    format_datePickerValue: (date) => {
      // Format date as YYYY-MM-DD
      if (date instanceof Date) {
          let d = date.toISOString();
          let splitD= d.split('T');
          
          return splitD[0];
      } else {
          return '';
      }
  }



};
