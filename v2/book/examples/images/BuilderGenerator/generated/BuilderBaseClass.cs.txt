#nullable disable

namespace BuilderGenerator
{
    /// <summary>Base class for object builder classes.</summary>
    /// <typeparam name="T">The type of the objects built by this builder.</typeparam>
    public abstract class Builder<T> where T : class
    {
        /// <summary>Gets or sets the object returned by this builder.</summary>
        /// <value>The constructed object.</value>
        #pragma warning disable CA1720 // Identifier contains type name
        protected System.Lazy<T> Object { get; set; }
        #pragma warning restore CA1720 // Identifier contains type name

        /// <summary>Builds the object instance.</summary>
        /// <returns>The constructed object.</returns>
        public abstract T Build();

        protected virtual void PostProcess(T value)
        {
        }

        /// <summary>Sets the object to be returned by this instance.</summary>
        /// <param name="value">The object to be returned.</param>
        /// <returns>A reference to this builder instance.</returns>
        public Builder<T> WithObject(T value)
        {
            Object = new System.Lazy<T>(() => value);

            return this;
        }
    }
}
