import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

type TIsSelected = {
   isSelected: boolean;
};

const Container = styled.div.attrs<TIsSelected>(({ isSelected }) => {
   return {
      className: isSelected ? "border-gray-800" : " hover:border-gray-800",
   };
})<TIsSelected>`
   ${tw`px-8 pt-3 pb-8 border hover:border-gray-800 transition-all`}
`;

const Content = styled.div`
   ${tw`mb-5`}
`;

const Name = styled.h3`
   ${tw`text-lg font-medium flex items-center`}
`;

const Button = styled.button.attrs<TIsSelected>(({ isSelected }) => {
   return {
      className: isSelected ? "bg-red-500" : "bg-lime-500",
   };
})<TIsSelected>`
   ${tw`ml-3 py-1 px-3 focus:outline-none text-sm text-white`}
`;

const Description = styled.h4`
   ${tw`font-medium`}
`;

const Price = styled(Description)``;

const DishTitle = styled.h5`
   ${tw`mt-5 mb-3 font-medium`}
`;

const DishOptions = styled.div`
   ${tw`grid gap-2 justify-start`}
`;

interface IDishProps {
   id?: number;
   isSelected?: boolean;
   description: string;
   name: string;
   price: number;
   isCustomer?: boolean;
   orderStarted?: boolean;
   options?: any[] | null;
   addItemToOrder?: (_dishId: number) => void;
   removeFromOrder?: (_dishId: number) => void;
   addOptionToItem?: (_dishId: number, _options: any) => void;
   children?: React.ReactNode;
}

const Dish: React.FC<IDishProps> = ({
   id = 0,
   description,
   name,
   price,
   isCustomer = false,
   orderStarted = false,
   options,
   addItemToOrder,
   isSelected = false,
   removeFromOrder,
   children: dishOptions,
}) => {
   const onClick = () => {
      if (orderStarted) {
         if (!isSelected && addItemToOrder) {
            return addItemToOrder(id);
         }
         if (isSelected && removeFromOrder) {
            return removeFromOrder(id);
         }
      }
   };

   return (
      <Container isSelected={isSelected}>
         <Content>
            <Name>
               {name}
               {orderStarted && (
                  <Button isSelected={isSelected} onClick={onClick}>
                     {isSelected ? "Remove" : "Add"}
                  </Button>
               )}
            </Name>
            <Description>{description}</Description>
         </Content>
         <Price>${price}</Price>

         {isCustomer && options && options?.length !== 0 && (
            <div>
               <DishTitle>Dish Options:</DishTitle>
               <DishOptions>{dishOptions}</DishOptions>
            </div>
         )}
      </Container>
   );
};

export default Dish;
