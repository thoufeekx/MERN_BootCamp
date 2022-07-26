import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;



// import { Html, Head, Main, NextScript } from 'next/document'

// export default function Document() {
//   return (
//     <Html>
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//         <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" 
//                 integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" 
//                 crossOrigin="anonymous"></script>
//       </body>
//     </Html>
//   )
// }








// import Document, { Html, Head, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const originalRenderPage = ctx.renderPage

//     // Run the React rendering logic synchronously
//     ctx.renderPage = () =>
//       originalRenderPage({
//         // Useful for wrapping the whole react tree
//         enhanceApp: (App) => App,
//         // Useful for wrapping in a per-page basis
//         enhanceComponent: (Component) => Component,
//       })

//     // Run the parent `getInitialProps`, it now includes the custom `renderPage`
//     const initialProps = await Document.getInitialProps(ctx)

//     return initialProps
//   }

//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />

//           <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" 
//                        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" 
//                          crossOrigin="anonymous"></script>



//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument






