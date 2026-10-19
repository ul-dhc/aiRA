# Model catalogue review

Documentation reviewed: 19 October 2026. Aim: review new model availability every three months, and address announced shutdowns or pricing changes sooner. This is a maintenance intention; it does not mean that an automated review is running.

Added options retain the existing task defaults and prompts. All additions support image input and text output. The review checks published compatibility and pricing, not comparative transcription accuracy. Authenticated requests and account access have not been tested.

| Model | Standard input/output price per million tokens | Official documentation |
| --- | --- | --- |
| GPT-6.1 Sol | $2 / $10 | [Model](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| GPT-6 Luna | $0.10 / $0.50 | [Model](https://developers.openai.com/api/docs/models/gpt-6-luna) |
| GPT-6 Astra | $10 / $50 | [Model](https://developers.openai.com/api/docs/models/gpt-6-astra) |
| Gemini 3.8 Flash | $0.75 / $3.75 through 31 December 2026; $1.50 / $7.50 thereafter | [Model](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash), [pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| Gemini 3.5 Flash-Lite | $0.30 / $2.50 | [Model](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [pricing](https://ai.google.dev/gemini-api/docs/pricing) |

OpenAI requests above 272,000 input tokens use 2x input and 1.5x output prices for the whole request. Prices assume standard processing without caching, regional premiums, or provider tools. Gemini 3.8 pricing changes automatically at the documented date when the app loads.

GPT-6.1 Sol and Astra use reasoning `low` by default and do not offer `none` or `minimal`. Luna defaults to `none`. The current SDK and UI expose supported levels through `xhigh`; `max` is not exposed. Temperature is omitted when reasoning is enabled. See the [OpenAI compatibility guide](https://developers.openai.com/api/docs/guides/latest-model).

Gemini 3.8 offers `low`, `medium`, and `high`, excluding unsupported `minimal`. Flash-Lite also offers `minimal`. See [Gemini thinking settings](https://ai.google.dev/gemini-api/docs/thinking). Rate limits for the additions depend on the API account, so the interface does not claim a fixed allowance.

Before the next release review, also check provider deprecations, account availability, model-specific output limits, sample handwriting and table results, and any SDK changes needed for newer API features.
