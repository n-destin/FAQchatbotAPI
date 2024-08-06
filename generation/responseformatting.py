def process_response(response):

    processed = response[0]
    previous_char = response[0]
    for char_index in range(1, len(response) - 1):
        processed += response[char_index]
        if (response[char_index] == '.' and response[char_index + 1] != ' ') or response[char_index] == ":":
            processed += '\n'
        previous_char == response[char_index]

    return processed