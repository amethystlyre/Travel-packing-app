module.exports = {
    format_date: (date) => {
      // Format date as DD MMM YYYY
      if (date instanceof Date){
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-AU", options);
    }
    else {
      return "____"
    }
    },
  };