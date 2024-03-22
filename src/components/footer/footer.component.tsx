export default function Footer({ footerItems }: any) {
  function getFooterItems(h3: any, ul: any) {
    let retchild: any[] = [];
    let retmain: any[] = [];
    let retresult: any[] = [];

    retmain.push(
      <h3
        key={"h3"}
        className="text-sm font-semibold tracking-wider dark:text-[#AEC1CC] text-gray500 uppercase"
      >
        {footerItems.name}
      </h3>
    );
    retchild.push(
      <FooterLinkMain
        key={"FooterMain"}
        name={footerItems.name}
        footerItem={footerItems.footerItemsCollection?.items}
      />
    );
    retmain.push(
      <ul key={"ul"} role="list" className="mt-4 space-y-4">
        {retchild}
      </ul>
    );

    retresult.push(retmain[h3]);
    retresult.push(retmain[ul]);

    return retresult;
  }

  function FooterLinkMain({ name, footerItem }: any) {
    let retchild: any[] = [];

    footerItem.map((childfooterItem: any, index: number) => {
      retchild.push(
        <FooterLinkChild key={index} item={childfooterItem} index={index} />
      );
    });

    return retchild;
  }

  function FooterLinkChild({ item, index }: any) {
    let ret = [];
    let link = "";
    ret.push(
      <li key={index}>
        <a
          href={item.href}
          className="text-base text-gray500 hover:text-gray900"
        >
          {item.name}
        </a>
      </li>
    );
    return ret;
  }

  return (
    <footer
      className="mt-4 bg-white border-t dark:bg-gray900"
      aria-labelledby="footer-heading"
    >
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>{getFooterItems(0, 1)}</div>
              <div className="mt-12 md:mt-0">{getFooterItems(2, 3)}</div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>{getFooterItems(4, 5)}</div>
              <div className="mt-12 md:mt-0">{getFooterItems(6, 7)}</div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0"></div>
        </div>
        <div className="pt-8 mt-8 border-gray200 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2"></div>
          <p className="mt-8 text-base dark:text-[#AEC1CC] text-gray500 md:mt-0 md:order-1">
            Copyright 2021, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
