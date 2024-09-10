export interface APIProductsType {
  attributes: {
    createdAt: string;
    description: string;
    name: string;
    price: number;
    publishedAt: string;
    teamName: string;
    updatedAt: string;
    gender: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    images: {
      data: [
        {
          id: number;
          attributes: {
            url: string;
            width: number;
            height: number;
            formats: {
              thumbnail: {
                url: string;
                width: number;
                height: number;
              };
            };
          };
        },
      ];
    };
    brand: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    color: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
  };
  id: number;
}
