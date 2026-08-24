// Shopify Configuration for KOBA
// Update these credentials with your Shopify store information

const SHOPIFY_CONFIG = {
    storefrontAccessToken: 'YOUR_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    shopName: 'koba-fashion', // Replace with your Shopify store name
    apiVersion: '2024-01',
};

// Shopify GraphQL endpoint
const SHOPIFY_ENDPOINT = `https://${SHOPIFY_CONFIG.shopName}.myshopify.com/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

// Function to fetch from Shopify GraphQL API
async function shopifyFetch(query) {
    try {
        const response = await fetch(SHOPIFY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            console.error('Shopify GraphQL Error:', data.errors);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error('Error fetching from Shopify:', error);
        return null;
    }
}

// GraphQL query to fetch all products
const GET_PRODUCTS_QUERY = `
    query GetProducts {
        products(first: 20) {
            edges {
                node {
                    id
                    title
                    handle
                    description
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
`;

// GraphQL query to create a checkout
const CREATE_CHECKOUT_QUERY = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkout {
                id
                webUrl
                lineItems(first: 20) {
                    edges {
                        node {
                            id
                            title
                            quantity
                            variant {
                                price {
                                    amount
                                }
                            }
                        }
                    }
                }
            }
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`;
