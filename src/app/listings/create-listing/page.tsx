"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const schema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  askingPrice: z.number().min(0),
  grossRevenue: z.number().min(0),
  adjCashflow: z.number().min(0),
});
type Schema = z.infer<typeof schema>;

export default function CreateListing() {
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const createListing = api.listing.create.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });
  const onSubmit = (data: Schema) => {
    createListing.mutate({
      name: data.name,
      location: data.location,
      askingPrice: data.askingPrice,
      grossRevenue: data.grossRevenue,
      adjCashflow: data.adjCashflow,
    });
    toast({
      title: "New Listing Created ",
    });
  };

  const {
    formState: { isValid },
  } = useForm({
    mode: "onBlur",
  });

  console.log(isValid);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-[200px] py-[50px]">
      <h1 className="text-center text-3xl">New Listing</h1>
      <div className="py-5 text-center">
        <div className="py-2">
          <Label>Company Name:</Label>
          <div>
            <input
              {...register("name", { required: "This field is required" })}
              className="my-2 rounded-lg border border-slate-300 px-3 py-2"
            ></input>
          </div>
        </div>
        <div className="py-2">
          <Label>Location:</Label>
          <div>
            <input
              {...register("location")}
              className="my-2 rounded-lg border border-slate-300 px-3 py-2"
            ></input>
          </div>
        </div>
        <div className="py-2">
          <Label>Asking Price:</Label>
          <div>
            <input
              {...register("askingPrice", {
                valueAsNumber: true,
              })}
              className="my-2 rounded-lg border border-slate-300 px-3 py-2"
            ></input>
          </div>
        </div>
        <div className="py-2">
          <Label>Gross Revenue:</Label>
          <div>
            <input
              {...register("grossRevenue", {
                valueAsNumber: true,
              })}
              className="my-2 rounded-lg border border-slate-300 px-3 py-2"
            ></input>
          </div>
        </div>
        <div className="py-2">
          <Label>Adjusted Cashflow:</Label>
          <div>
            <input
              {...register("adjCashflow", {
                valueAsNumber: true,
              })}
              className="my-2 rounded-lg border border-slate-300 px-3 py-2"
            ></input>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-black hover:bg-black"
          type="submit"
          disabled={false}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
