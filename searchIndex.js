const seachIndexForAutoComplate = {
  mappings: {
    dynamic: false,
    fields: {
      title: [
        {
          foldDiacritics: false,
          maxGrams: 7,
          minGrams: 2,
          tokenization: "edgeGram",
          type: "autocomplete",
        },
      ],
    },
  },
};
