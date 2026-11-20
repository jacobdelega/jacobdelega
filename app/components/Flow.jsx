export default function Flow({ steps }) {
  return (
    <div className="flow">
      <span className="flow-line" aria-hidden="true" />
      <span className="flow-dot" aria-hidden="true" />
      <ol className="relative space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flow-node" style={{ '--i': i }}>
            <span className="flow-num">{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}
