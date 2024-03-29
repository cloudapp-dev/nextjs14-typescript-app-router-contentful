import { Container } from "@/components/contentful/container/Container";
import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

function NotFoundPage() {
  return (
    <>
      <main className={`${urbanist.variable} font-sans`}>
        <div className="min-h-full px-4 py-4  sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <Container className="mt-5">
              <div className="flex mt-6">
                <p className="text-4xl font-extrabold text-blue600 sm:text-5xl">
                  Ups
                </p>
                <div className="ml-6">
                  <div className="pl-6 border-l border-gray500">
                    <h2 className="text-3xl font-bold tracking-tight text-gray900 dark:text-white sm:text-4xl">
                      Something went wrong! - Etwas ist schief gelaufen !
                    </h2>
                    <p className="mt-1 text-lg text-gray500 dark:text-white">
                      Please select a topic from the tag cloud above or go back
                      home
                    </p>
                    <p className="mt-1 text-lg text-gray500 dark:text-white">
                      Bitte wählen Sie ein Thema aus der Cloud oben oder klicken
                      auf Go back home Button
                    </p>
                  </div>
                  <div className="flex mt-10 space-x-3 sm:pl-6">
                    <a
                      href="/"
                      className="inline-flex items-center px-6 py-4 text-sm text-4xl font-medium text-white bg-blue600 border border-transparent rounded-md shadow-sm hover:bg-blue700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue500"
                    >
                      Go back home
                    </a>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
