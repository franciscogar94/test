
//const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
export class Test{
 urls = [
    'https://tiab-badalona.cat/',
    'https://tiab-badalona.cat/membres-tiab/',
    'https://tiab-badalona.cat/formar-part-de-la-tiab/'
];

    constructor() {
     
    }

/** Metodo para scanear las url */
   async ScanUrls() {
       for (const element of this.urls) {
    /** Resultado del scan hecho con lighthouse y chrome launcher. Devuelve un string largo de la pagina web */
    const result = await this.handleElement(element);
         // Compruebas que es tipo string identificando el tipo  
         console.log(typeof result);
         /// Aqui ves que haces con el resultado Lo subes  a la DB etc.
         ///////////////////////////////////////////////////   
    
 }  
    }



/** Metodo para manejar los elementos de los URLS
 * @param elem Elemento de la url
 * @returns Devuelve una promesa con el resultado del manejamiento.
 */
    async handleElement(element:string) {
        try{
            console.log(element)
            const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
            const options = { logLevel: 'info', output: 'html', onlyCategories: ['accessibility'], port: chrome.port };
            const runnerResult = await lighthouse(element, options);
           
            // `.report` is the HTML report as a string
            // const reportHtml = runnerResult.report;
        
            /** Esto devuelve un string */
            const repostJson = runnerResult.report;
        
            // Este string lo puedes guardar directamente en la base de datos mysql como string.
        
        
         //   console.log(repostJson);
            // Aqui lo estas transformando en html. Si lo vas a guardar directamente a la DB no es necesario
          //  fs.writeFileSync('lhreport.html', repostJson);
        
            // fs.writeFileSync('lhreport.html', reportHtml);
        
            // `.lhr` is the Lighthouse Result as a JS object
            console.log('Report is done for', runnerResult.lhr.finalUrl);
            // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
        
            await chrome.kill();
            return repostJson;
        }
        catch(err){
            console.log(err);
            throw(err);
        }
}
}
/** Aqui empezamos la app */
const test = new Test();
test.ScanUrls();
