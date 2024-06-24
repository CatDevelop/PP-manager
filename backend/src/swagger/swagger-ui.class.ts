import { SWAGGER_UI_CONSTANTS } from './constants/swagger-ui.constants';

export class SwaggerUI {
  constructor() {}

  private customSiteTitle = 'PP-manager';
  private faviconFilename = 'Logo.svg';
  private topbarIconFilename = 'Logo.svg';

  private customfavIcon: string = `/static/swagger/${this.faviconFilename}`;
  private customCss: string = `
  html { height: 100%; }
  body { height: 100%; }
  .swagger-ui { background-color: #242428; min-height: 100vh;}
  .swagger-ui .info .title { color: #FFFFFF; text-align: center; }
  .swagger-ui .info p { color: #C2C2C2; text-align: center;  }
  .swagger-ui .scheme-container { background-color: #202023; }
  .topbar-wrapper { content:url('http://localhost:5000/api/static/swagger/${this.topbarIconFilename}'); width:250px; height:auto; }
  .topbar-wrapper svg { visibility: hidden; }
  .swagger-ui .info .title small.version-stamp { display: none; }
  .swagger-ui .topbar { background-color: #202023; }
  .swagger-ui .opblock-tag { color: #FFFFFF; }
  .swagger-ui .opblock-tag p { color: #C2C2C2; }
  .swagger-ui .opblock-summary-control:focus { outline: none; }
  .swagger-ui .opblock .opblock-summary-path { color: #ffffff;}
  .swagger-ui .opblock .opblock-summary-description { color: #C2C2C2; }
  .swagger-ui .opblock.opblock-get { background-color: #313134; border-color: #737373; }
  .swagger-ui .opblock.opblock-get .opblock-summary-method { background-color: #1668dc; border-color: #1668dc; color: #FFFFFF; border-radius: 6px; }
  .swagger-ui .opblock.opblock-get .opblock-summary { background-color: #202023; border-color: #737373; }
  .swagger-ui .opblock.opblock-post { background-color: #313134; border-color: #737373; }
  .swagger-ui .opblock.opblock-post .opblock-summary-method { background-color: #20c997; border-color: #737373; color: #FFFFFF; border-radius: 6px; }
  .swagger-ui .opblock.opblock-post .opblock-summary { background-color: #202023; border-color: #737373; }
  .swagger-ui .opblock.opblock-delete { background-color: #313134; border-color: #737373; }
  .swagger-ui .opblock.opblock-delete .opblock-summary-method { background-color: #F053A1; border-color: #1668dc; color: #FFFFFF; border-radius: 6px; }
  .swagger-ui .opblock.opblock-delete .opblock-summary { background-color: #202023; border-color: #737373; }
  .swagger-ui .opblock.opblock-patch { background-color: #313134; border-color: ${SWAGGER_UI_CONSTANTS.HTTP_METHODS.PATCH.BORDER_COLOR}; }
  .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: ${SWAGGER_UI_CONSTANTS.HTTP_METHODS.PATCH.SUMMARY_COLOR}; }
  .swagger-ui .opblock.opblock-put { background-color: #313134; border-color: ${SWAGGER_UI_CONSTANTS.HTTP_METHODS.PUT.BORDER_COLOR}; }
  .swagger-ui .opblock.opblock-put .opblock-summary-method { background: ${SWAGGER_UI_CONSTANTS.HTTP_METHODS.PUT.SUMMARY_COLOR}; }
  .swagger-ui .btn.authorize { background-color: #1668dc; border-color: #1668dc; color: #FFFFFF; border-radius: 6px; }
  .swagger-ui .btn.authorize svg { fill: #FFFFFF; } 
  .swagger-ui .authorization__btn svg { fill: #C2C2C2; } 
  .swagger-ui section.models { border: 1px solid #737373; border-radius: 6px; } 
  .swagger-ui section.models h4 span { color: #FFFFFF; } 
  .swagger-ui .expand-operation, .swagger-ui .opblock-control-arrow { fill: #FFFFFF; }
  .swagger-ui .opblock-description-wrapper p {  color: #C2C2C2; } 
  .swagger-ui .opblock .opblock-section-header { border-color: #737373; background-color: #313134;}
  `;

  private swaggerOptions = {
    persistAuthorization: true
  };

  public customOptions = {
    customfavIcon: this.customfavIcon,
    customSiteTitle: this.customSiteTitle,
    customCss: this.customCss,
    swaggerOptions: this.swaggerOptions
  };
}
