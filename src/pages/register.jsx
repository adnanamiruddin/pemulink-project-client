import Input from "@/components/common/functions/Input";

export default function Register() {
  

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        type="email"
      />
      <Input
        label="Full Name"
        name="email"
        placeholder="john@gmail.com"
      />
      <Input
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        type="email"
      />
    </div>
  );
}
