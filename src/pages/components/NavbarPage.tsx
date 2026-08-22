import { Navbar } from "@/components/navbar";
import ComponentDemo from "../ComponentsDemo";

const NavbarPage = () => {
  const usageCode = `import { Navbar } from "@devalokchauhan/dev-ease-ui-alok";
      <Navbar />


  `;

  return (
    <div>
      <ComponentDemo code={usageCode}>
        <Navbar />
      </ComponentDemo>
    </div>
  );
};

export default NavbarPage;
