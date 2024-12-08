package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func read() ([][]int, error) {
	file, err := os.Open("inputs.txt")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var records [][]int
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, " ")
		var record []int
		for _, part := range parts {
			num, err := strconv.Atoi(part)
			if err != nil {
				return nil, err
			}
			record = append(record, num)
		}
		records = append(records, record)
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return records, nil
}

type RecordMetadata struct {
	Mode    string
	Safe    bool
	Record  []int
	Failure string
}

func main() {
	records, err := read()
	if err != nil {
		log.Fatal(err)
	}

	metas := []RecordMetadata{}

	// First, we'll try to get determine the mode of the record
	// Next, if the mode of the record changes, we'll mark as failure
	// Next, if the distance is greater than 3, we'll mark as failure
	for _, record := range records {
		var mode string
		last := 0
		counter := 0
		for i, number := range record {
			if i == 0 {
				last = number
				continue
			}

			if i == 1 && last > number {
				mode = "desc"
			} else if i == 1 && last < number {
				mode = "asc"
			}

			if last == number {
				counter += 1
				if counter <= 1 {
					continue
				}
				metas = append(metas, RecordMetadata{
					Mode:    "",
					Safe:    false,
					Record:  record,
					Failure: "Found equal",
				})
				break
			} else if mode == "desc" && last < number {
				counter += 1
				if counter <= 1 {
					continue
				}
				metas = append(metas, RecordMetadata{
					Mode:    "",
					Safe:    false,
					Record:  record,
					Failure: "Started desc; found asc",
				})
				break
			} else if mode == "asc" && last > number {
				counter += 1
				if counter <= 1 {
					continue
				}
				metas = append(metas, RecordMetadata{
					Mode:    "",
					Safe:    false,
					Record:  record,
					Failure: "Started asc; found desc",
				})
				break
			}

			distance := number - last
			if distance < 0 {
				distance = -distance
			}

			if distance > 3 {
				counter += 1
				if counter <= 1 {
					continue
				}
				metas = append(metas, RecordMetadata{
					Mode:    "",
					Safe:    false,
					Record:  record,
					Failure: "Distance greater than 3",
				})
				break
			}

			last = number
		}

		if counter <= 1 {
			metas = append(metas, RecordMetadata{
				Mode:    mode,
				Safe:    true,
				Record:  record,
				Failure: "",
			})
		}
	}

	// for _, meta := range metas {
	// 	fmt.Printf("%s\t%t %v %s\n", meta.Mode, meta.Safe, meta.Record, meta.Failure)
	// }

	safe := []RecordMetadata{}
	for _, meta := range metas {
		if meta.Safe {
			safe = append(safe, meta)
		}
	}

	fmt.Printf("Safe: %d\n", len(safe))
	fmt.Printf("Unsafe: %d\n", len(metas)-len(safe))
	fmt.Printf("Total: %d\n", len(metas))
}
