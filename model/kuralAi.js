// // AiKuralService.js
// const axios = require("axios");
// const kuralData = require("../thirukural.json");
// const { getMultilingualPrompt } = require("../config/getPrompt");

// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// class AiKuralService {
//   static async detectLanguage(text) {
//     const francModule = await import("franc");
//     const langsModule = await import("langs");
//     const franc = francModule.franc; // Use named export
//     const langs = langsModule.default;

//     const langCode = franc(text || "");
//     const lang = langs.where("3", langCode);
//     return lang?.name || "English";
//   }

//   static findKuralByNumber(number) {
//     return kuralData.find((item) => item.number === Number(number)) || null;
//   }

//   static async getAiResponse(req) {
//     try {
//       const { query } = req.body;
//       if (!query) {
//         return {
//           success: false,
//           message: "Query is required.",
//           data: {},
//         };
//       }

//       const trimmedQuery = query.trim();
//       const isNumber = /^\d+$/.test(trimmedQuery);
//       const detectedLanguage = await AiKuralService.detectLanguage(trimmedQuery);

//       // Check for direct number-based Kural
//       if (isNumber) {
//         const kural = AiKuralService.findKuralByNumber(trimmedQuery);
//         if (kural) {
//           const langCheck = detectedLanguage?.toLowerCase?.() || "english";
//           return {
//             success: true,
//             message: "Kural found from local data",
//             data: {
//               source: "local",
//               language: detectedLanguage,
//               parsed: {
//                 number: kural.number.toString(),
//                 tamil: `${kural.line1}\n${kural.line2}`,
//                 transliteration: "", // Add logic if needed
//                 wordMeaning: "", // Add logic if needed
//                 tamilExplanation: kural.tam_exp,
//                 englishExplanation: kural.eng_exp,
//                 moral: "", // Add logic if needed
//                 example: "", // Add logic if needed
//                 actionTip: "", // Add logic if needed
//                 chapter: kural.chap_tam,
//                 book: kural.sect_tam,
//               },
//             },
//           };
//         }
//       }

//       // Build prompt and call Gemini API
//       const prompt = getMultilingualPrompt(trimmedQuery);

//       const response = await axios.post(GEMINI_URL, {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: prompt }],
//           },
//         ],
//       });

//       const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//       return {
//         success: true,
//         message: "AI response fetched successfully",
//         data: {
//           source: "ai",
//           language: detectedLanguage,
//           result,
//         },
//       };
//     } catch (error) {
//       console.error("Gemini Error:", error.response?.data || error.message);
//       return {
//         success: false,
//         message: "Gemini API failed.",
//         data: {},
//       };
//     }
//   }
// }

// module.exports = AiKuralService;



// AiKuralService.js
// const axios = require("axios");
// const kuralData = require("../thirukural.json");
// const { getMultilingualPrompt } = require("../config/getPrompt");

// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// class AiKuralService {
//   static async detectLanguage(text) {
//     const francModule = await import("franc");
//     const langsModule = await import("langs");
//     const franc = francModule.franc; // Use named export
//     const langs = langsModule.default;

//     const langCode = franc(text || "");
//     const lang = langs.where("3", langCode);
//     return lang?.name || "English";
//   }

//   static findKuralByNumber(number) {
//     return kuralData.find((item) => item.number === Number(number)) || null;
//   }

//   static formatKuralMarkdown(kural) {
//     return `### திருக்குறள் – குறள் ${kural.number}

// 🔹 **Tamil Kural:**  
// > ${kural.line1}  
// > ${kural.line2}

// 🔹 **Transliteration:**  
// > (Add Romanized lines here if available)

// 🔹 **Meaning in English:**  
// > ${kural.eng}

// 🔹 **Explanation in English:**  
// > ${kural.eng_exp}`;
//   }

//   static async getAiResponse(req) {
//     try {
//       const { query } = req.body;
//       if (!query) {
//         return {
//           success: false,
//           message: "Query is required.",
//           data: {},
//         };
//       }

//       const trimmedQuery = query.trim();
//       const isNumber = /^\d+$/.test(trimmedQuery);
//       const detectedLanguage = await AiKuralService.detectLanguage(trimmedQuery);

//       // Check for direct number-based Kural
//       if (isNumber) {
//         const kural = AiKuralService.findKuralByNumber(trimmedQuery);
//         if (kural) {
//           const markdown = AiKuralService.formatKuralMarkdown(kural);
//           return {
//             success: true,
//             message: "LAI response fetched successfully",
//             data: {
//               source: "ai",
//               language: detectedLanguage,
//               result: markdown,
//             },
//           };
//         }
//       }

//       // Build prompt and call Gemini API
//       const prompt = getMultilingualPrompt(trimmedQuery);

//       const response = await axios.post(GEMINI_URL, {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: prompt }],
//           },
//         ],
//       });

//       const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//       return {
//         success: true,
//         message: "AI response fetched successfully",
//         data: {
//           source: "ai",
//           language: detectedLanguage,
//           result,
//         },
//       };
//     } catch (error) {
//       console.error("Gemini Error:", error.response?.data || error.message);
//       return {
//         success: false,
//         message: "Gemini API failed.",
//         data: {},
//       };
//     }
//   }
// }

// module.exports = AiKuralService;

// AiKuralService.js
const axios = require("axios");
const kuralData = require("../thirukural.json");
const { getMultilingualPrompt } = require("../config/getPrompt");
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

class AiKuralService {
  static async detectLanguage(text) {
    const francModule = await import("franc");
    const langsModule = await import("langs");
    const franc = francModule.franc; // Use named export
    const langs = langsModule.default;

    const langCode = franc(text || "");
    const lang = langs.where("3", langCode);
    return lang?.name || "English";
  }

  static findKuralByNumber(number) {
    return kuralData.find((item) => item.number === Number(number)) || null;
  }

  static extractNumberFromQuery(query) {
    const match = query.match(/(?:kural\s*)?(\d{1,4})(?:\s*)(?:st|nd|rd|th)?/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  }

  static formatKuralMarkdown(kural) {
    return `### திருக்குறள் – குறள் ${kural.number}

🔹 **Tamil Kural:**  
> ${kural.line1}  
> ${kural.line2}

🔹 **Transliteration:**  
> (Add Romanized lines here if available)

🔹 **Meaning in English:**  
> ${kural.eng}

🔹 **Explanation in English:**  
> ${kural.eng_exp}`;
  }

  static async correctGrammar(text) {
    try {
      const response = await axios.post(GEMINI_URL, {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a grammar correction tool. Correct the spelling and grammar of the following user input without changing the meaning:

"""
${text}
"""`
              },
            ],
          },
        ],
      });
      const corrected = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return corrected?.trim() || text;
    } catch (err) {
      console.error("Grammar Correction Error:", err.message);
      return text;
    }
  }

  static async enrichBriefQueryWithTirukkuralOnly(text) {
    try {
      const response = await axios.post(GEMINI_URL, {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `The user input is very short and vague: "${text}".
Make it more specific only using Tirukkural wisdom and terminology, like a rephrased question asking for a philosophical or ethical value mentioned in Tirukkural.
Use only Tirukkural language and meaning, don't bring modern comparisons.`
              },
            ],
          },
        ],
      });

      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text
      );
    } catch (err) {
      console.error("Enrichment Error:", err.message);
      return text;
    }
  }

  static async getAiResponse(req) {
    try {
      const { query } = req.body;
      if (!query) {
        return {
          success: false,
          message: "Query is required.",
          data: {},
        };
      }

      const trimmedQuery = query.trim();
      const correctedQuery = await AiKuralService.correctGrammar(trimmedQuery);
      const detectedLanguage = await AiKuralService.detectLanguage(correctedQuery);
      const numberFromQuery = AiKuralService.extractNumberFromQuery(correctedQuery);

      // Check for extracted number-based Kural
      if (numberFromQuery) {
        const kural = AiKuralService.findKuralByNumber(numberFromQuery);
        if (kural) {
          const markdown = AiKuralService.formatKuralMarkdown(kural);
          return {
            success: true,
            message: "AI response fetched successfully",
            data: {
              source: "ai",
              language: detectedLanguage,
              result: markdown,
            },
          };
        }
      }

      const enrichedQuery = await AiKuralService.enrichBriefQueryWithTirukkuralOnly(correctedQuery);
      const prompt = getMultilingualPrompt(enrichedQuery);

      const response = await axios.post(GEMINI_URL, {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      return {
        success: true,
        message: "AI response fetched successfully",
        data: {
          source: "ai",
          language: detectedLanguage,
          result,
        },
      };
    } catch (error) {
      console.error("Gemini Error:", error.response?.data || error.message);
      return {
        success: false,
        message: "Gemini API failed.",
        data: {},
      };
    }
  }
}

module.exports = AiKuralService;

