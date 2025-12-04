const newman = require('newman');

const collections = [
    {file: 'collections/API_Login_Tests.json', report: 'reports/login.html'},
    {file: 'collections/API_Register_Tests.json', report: 'reports/register.html'},
    {file: 'collections/API_UpdatePassword_Tests.json', report: 'reports/updatePassword.html'},
    {file: 'collections/API_Admin_Tests.json', report: 'reports/adminActions.html'},
    {file: 'collections/API_Books_Tests.json', report: 'reports/books.html'}
];
//ir añadiendo en el array todas las colecciones

const environment = 'environments/pre.env.json';

(async () => {
  for (const c of collections) {
    console.log(`Ejecutando colección: ${c.file}`);
    await new Promise((resolve, reject) => {
      newman.run({
        collection: c.file,
        environment,
        reporters: ['htmlextra'],
        reporter: { htmlextra: { export: c.report } }
      }, (err) => {
        if (err) reject(err);
        else {
          console.log(`✅ Finalizada: ${c.file}`);
          resolve();
        }
      });
    });
  }
})();

// node run-all-tests.js -> comando para lanzar todos los tests