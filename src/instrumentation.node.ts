// Imports
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
import { NodeSDK } from "@opentelemetry/sdk-node"
import { PrismaInstrumentation } from "@prisma/instrumentation"
import { Resource } from "@opentelemetry/resources"
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node"
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions"
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'


// Configure the OTLP trace exporter
const traceExporter = new OTLPTraceExporter({
  url: "https://api.honeycomb.io/v1/traces", // Replace with your collector's endpoint
  headers: {
    "x-honeycomb-team": `${process.env.HONEYCOMB_API_KEY}`, // Replace with your Honeycomb API key or collector auth header
  },
})

// Initialize the NodeSDK
const sdk = new NodeSDK({
  resource: new Resource({
      [ATTR_SERVICE_NAME]: "techhub", // Replace with your service name
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  instrumentations: [
    new PrismaInstrumentation({
      middleware: true, // Enable middleware tracing if needed
    }),
    getNodeAutoInstrumentations()
  ],
})

// Start the SDK
sdk.start()