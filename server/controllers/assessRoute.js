const Learnosity = require('learnosity-sdk-nodejs/index'); // Include Learnosity SDK constructor
const uuid = require('uuid'); // Load the UUID library
const production_domain = require('../utils/domains');

const assessRoute = () => {

  // - - - - - - Learnosity's server-side configuration - - - - - - //

  // Generate the user ID and session ID as UUIDs, set the web server domain.
  const user_id = uuid.v4();
  const session_id = uuid.v4();

  let domain = 'localhost';

  // switch for Domain if prod is hosted on a different domain.
  if (process.env.NODE_ENV === 'production') {
    domain = production_domain.name;
  };

  //console.log(production_domain.prodDomain());

  // variable created to route from assessment api to reports api 
  // - triggered when user closes test.
  const user_logged_in = `/reports?user_id=${user_id}`;

  // Instantiate the SDK
  const learnositySdk = new Learnosity(); 

  // Primer configuration parameters:
  const request = learnositySdk.init(

      'items', // selects Items API

      /*  Your Consumer Key and Consumer Secret are the public & private security keys required to 
          access Learnosity APIs and data.
          These keys grant access to Learnosity's public demos account. Learnosity will provide 
          keys for your own account. 
      */
      {
        consumer_key: process.env.CONSUMER_KEY, 
        domain: domain
      },
      process.env.CONSUMER_SECRET, 
      {
        // Unique student identifier, a UUID generated on line 9.
        user_id: user_id,

        // A reference of the Activity to retrieve from the Item bank, defining which
        // Items will be served in this assessment.
        
        activity_template_id: 'react_sdk_primer_activity',

        // Uniquely identifies this specific assessment attempt session for  save/resume, data
        // retrieval and reporting purposes. A UUID generated on line 18.
        session_id: session_id,

        // Used in data retrieval and reporting to compare results with other users
        // submitting the same assessment.
        activity_id: 'react_sdk_primer_activity',

        // Selects a rendering mode, `assess` type is a 'standalone' mode (loading a complete
        // assessment player for navigation, alternatively use `inline` for embedding into a page).
        rendering_type: 'assess',

        // Selects the context for the student response storage `submit_practice` mode means
        // the student response is storage in the Learnosity cloud, for grading.
        type: 'submit_practice',

        // Human-friendly display name to be shown in reporting.
        name: 'A Learnosity React Demo',

        // Can be set to `initial, `resume` or `review`. Optional. Default = `initial`.
        state: 'initial',

        config: {
          configuration: {
            'onsubmit_redirect_url': user_logged_in,
            'lazyload':true,
            'question_indexing': true
          }
      }
    });

    return { request };
}

module.exports = assessRoute;
